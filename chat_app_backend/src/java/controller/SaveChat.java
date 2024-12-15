package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.Chat;
import entity.Chat_Status;
import entity.User;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "SaveChat", urlPatterns = {"/SaveChat"})
public class SaveChat extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {

            Gson gson = new Gson();

            JsonObject reuestObject = gson.fromJson(req.getReader(), JsonObject.class);

            JsonObject responseObject = new JsonObject();
            responseObject.addProperty("status", false);

            if (reuestObject != null && !reuestObject.get("msg").getAsString().isEmpty()) {
                Session session = HibernateUtil.getSessionFactory().openSession();

                User fromUser = (User) session.get(User.class, reuestObject.get("fromUser").getAsInt());
                User toUser = (User) session.get(User.class, reuestObject.get("toUser").getAsInt());

                if (fromUser != null && toUser != null) {

                    Chat_Status status = (Chat_Status) session.get(Chat_Status.class, 2);

                    List<Chat> chatList = (List<Chat>) session.createCriteria(Chat.class).add(Restrictions.eq("chat_status", status)).
                            add(Restrictions.eq("to_user", fromUser)).list();

                    if (!chatList.isEmpty()) {
                        
                        Chat_Status status2 = (Chat_Status)session.get(Chat_Status.class, 1);
                        
                        for (Chat chat : chatList) {
                            chat.setChat_status(status2);
                            session.update(chat);
                        }
                    }

                    Chat chat = new Chat();
                    chat.setChat_status(status);
                    chat.setDate_time(new Date());
                    chat.setFrom_user(fromUser);
                    chat.setTo_user(toUser);
                    chat.setMessage(reuestObject.get("msg").getAsString());

                    session.save(chat);

                    session.beginTransaction().commit();

                    responseObject.addProperty("status", true);
                }
                session.close();
            }

            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson(responseObject));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
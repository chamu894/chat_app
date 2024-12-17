package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.Chat;
import entity.Chat_Status;
import entity.User;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "GetChat", urlPatterns = {"/GetChat"})
public class GetChat extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();

        JsonObject requestObject = gson.fromJson(req.getReader(), JsonObject.class);

        JsonObject responseObject = new JsonObject();

        responseObject.addProperty("status", false);

        if (requestObject != null) {

            if (!requestObject.get("fromUser").getAsString().isEmpty() && !requestObject.get("toUser").getAsString().isEmpty()) {

                Session session = HibernateUtil.getSessionFactory().openSession();

                User fromUser = (User) session.get(User.class, requestObject.get("fromUser").getAsInt());
                User toUser = (User) session.get(User.class, requestObject.get("toUser").getAsInt());

                if (fromUser != null && toUser != null) {

                    List<Chat> chatList = (List<Chat>) session.createCriteria(Chat.class)
                            .add(Restrictions.or(
                                    Restrictions.and(
                                            Restrictions.eq("from_user", fromUser),
                                            Restrictions.eq("to_user", toUser)
                                    ),
                                    Restrictions.and(
                                            Restrictions.eq("from_user", toUser),
                                            Restrictions.eq("to_user", fromUser)
                                    )
                            )).addOrder(Order.asc("id")).list();

                    List<JsonObject> list = new ArrayList<>();

                    if (!chatList.isEmpty()) {

                        Chat_Status status = (Chat_Status) session.get(Chat_Status.class, 1);

                        for (Chat chat : chatList) {

                            if (chat.getTo_user().equals(fromUser) && !chat.getChat_status().equals(status)) {
                                chat.setChat_status(status);
                                session.update(chat);
                                session.beginTransaction().commit();
                            }

                            JsonObject chatListObject = new JsonObject();

                            chatListObject.addProperty("fromUser", chat.getFrom_user().getId());
                            chatListObject.addProperty("msg", chat.getMessage());
                            chatListObject.addProperty("time", new SimpleDateFormat("yyyy-mm-dd hh:mm a").format(chat.getDate_time()));
                            chatListObject.addProperty("status", chat.getChat_status().getId());

                            list.add(chatListObject);

                        }

                    }

                    responseObject.addProperty("status", true);
                    responseObject.add("chatList", gson.toJsonTree(list));

                }

                session.close();

            }

        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responseObject));

    }

}
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.Chat;
import entity.Chat_Status;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.crypto.Data;
import model.HibernateUtil;
import org.hibernate.Session;

@WebServlet(name = "SaveChat", urlPatterns = {"/SaveChat"})
public class SaveChat extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {

            Gson gson = new Gson();

            JsonObject reuestObject = gson.fromJson(req.getReader(), JsonObject.class);

            Session session = HibernateUtil.getSessionFactory().openSession();

            User fromUser = (User) session.get(User.class, reuestObject.get("fromUser").getAsInt());
            User toUser = (User) session.get(User.class, reuestObject.get("toUser").getAsInt());

            Chat_Status status = (Chat_Status) session.get(Chat_Status.class, 2);

            Chat chat = new Chat();
            chat.setChat_status(status);
            chat.setDate_time(new Date());
            chat.setFrom_user(fromUser);
            chat.setTo_user(toUser);
            chat.setMessage(reuestObject.get("msg").getAsString());

            session.save(chat);

            session.beginTransaction().commit();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
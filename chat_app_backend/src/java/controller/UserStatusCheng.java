package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import entity.User_Status;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Session;

@WebServlet(name = "UserStatusCheng", urlPatterns = {"/UserStatusCheng"})
public class UserStatusCheng extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("status", false);

        int id = Integer.parseInt(req.getParameter("id"));
        int statusId = Integer.parseInt(req.getParameter("st"));

        if (id != 0 & statusId != 0) {

            Session session = HibernateUtil.getSessionFactory().openSession();

            User user = (User) session.get(User.class, id);

            if (user != null) {

                User_Status status = (User_Status) session.get(User_Status.class, statusId);

                user.setUser_status(status);

                session.update(user);

                session.beginTransaction().commit();

                responseJson.addProperty("status", true);
            }

            session.close();

        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responseJson));

    }

}
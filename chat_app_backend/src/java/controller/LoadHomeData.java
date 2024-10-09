package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.Chat;
import entity.User;
import entity.User_Status;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "LoadHomeData", urlPatterns = {"/LoadHomeData"})
public class LoadHomeData extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Gson gson = new Gson();

        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("status", false);
        responseJson.addProperty("message", "Unable to prosses your account");

        try {

            Session session = HibernateUtil.getSessionFactory().openSession();

            String userId = request.getParameter("id");

            User user = (User) session.get(User.class, Integer.parseInt(userId));

            User_Status user_Status = (User_Status) session.get(User_Status.class, 1);

            user.setUser_status(user_Status);
            session.update(user);

            Criteria criteria1 = session.createCriteria(User.class);
            criteria1.add(Restrictions.ne("id", user.getId()));

            List<User> otherUserlist = criteria1.list();

            for (User otherUser : otherUserlist) {
                otherUser.getPassword(null);
            }

            Criteria criteria2 = session.createCriteria(Chat.class);
            criteria2.add(
                    Restrictions.or(
                            Restrictions.eq("from_user", user),
                            Restrictions.eq("to_user", user)
                    )
            );
            criteria2.addOrder(Order.desc("id"));

            responseJson.addProperty("status", true);
            responseJson.addProperty("message", "Sign In Success");
            responseJson.addProperty("user", gson.toJson(user));
            responseJson.addProperty("otherUserlist", gson.toJson(otherUserlist));

            session.beginTransaction().commit();
            session.close();

        } catch (Exception e) {
        }

    }

}

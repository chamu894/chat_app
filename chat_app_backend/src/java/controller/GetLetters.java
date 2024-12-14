package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "GetLetters", urlPatterns = {"/GetLetters"})
public class GetLetters extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("letters", "");

        if (request.getParameter("mobile") != null) {
            String mobile = request.getParameter("mobile");
            if (!mobile.isEmpty()) {
                Session session = HibernateUtil.getSessionFactory().openSession();
                User user = (User) session.createCriteria(User.class).add(Restrictions.eq("mobile", mobile)).uniqueResult();
                if (user != null) {
                    responseJson.addProperty("letters", user.getFrist_name().charAt(0) + "" + user.getLast_name().charAt(0));
                }
                session.close();
            }
        }

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseJson));
    }

}

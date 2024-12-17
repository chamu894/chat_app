package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.Chat;
import entity.User;
import java.io.File;
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

@WebServlet(name = "LoadHomeData", urlPatterns = {"/LoadHomeData"})
public class LoadHomeData extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Gson gson = new Gson();

        JsonObject requestJson = gson.fromJson(request.getReader(), JsonObject.class);

        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("status", false);
        responseJson.addProperty("content", "Unable to prosses your account");

        try {

            if (requestJson != null) {

                if (!requestJson.get("id").getAsString().isEmpty()) {
                    Session session = HibernateUtil.getSessionFactory().openSession();

                    User user = (User) session.get(User.class, requestJson.get("id").getAsInt());

                    if (user != null) {

                        List<User> userList = (List<User>) session.createCriteria(User.class)
                                .add(Restrictions.ne("id", user.getId())).list();

                        List<JsonObject> list = new ArrayList<>();

                        for (User contact : userList) {

                            List<Chat> chatList = (List<Chat>) session.createCriteria(Chat.class)
                                    .add(Restrictions.or(
                                            Restrictions.and(
                                                    Restrictions.eq("from_user", user),
                                                    Restrictions.eq("to_user", contact)
                                            ),
                                            Restrictions.and(
                                                    Restrictions.eq("from_user", contact),
                                                    Restrictions.eq("to_user", user)
                                            )
                                    )).addOrder(Order.desc("id")).list();

                            JsonObject object = new JsonObject();

                            object.addProperty("toUser", contact.getId());
                            object.addProperty("name", contact.getFrist_name() + " " + contact.getLast_name());

                            if (new File(request.getServletContext().getRealPath("") + File.separator + "AvatarImages" + File.separator + contact.getMobile() + ".png").exists()) {
                                object.addProperty("image", true);
                            } else {
                                object.addProperty("image", false);
                            }

                            JsonObject chatObject = new JsonObject();

                            if (!chatList.isEmpty()) {
                                Chat chat = chatList.get(0);

                                System.out.println(chat.getId());

                                chatObject.addProperty("msg", chat.getMessage());
                                chatObject.addProperty("fromUser", chat.getFrom_user().getId());
                                chatObject.addProperty("time", new SimpleDateFormat("yyyy-mm-dd hh:mm a").format(chat.getDate_time()));
                                chatObject.addProperty("status", chat.getChat_status().getId());

                            }

                            object.add("lastChat", gson.toJsonTree(chatObject));

                            list.add(object);

                        }

                        responseJson.addProperty("status", true);
                        responseJson.add("content", gson.toJsonTree(list));

                    }

                }

            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseJson));

    }

}
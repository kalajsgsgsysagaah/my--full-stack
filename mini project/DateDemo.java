import javax.swing.*;
import java.awt.*;

public class GridLayoutExample {
    public static void main(String[] args) {
        // Create a JFrame (window)
        JFrame jf = new JFrame("GridLayout Example");

        // Set the layout manager to GridLayout with 2 rows and 2 columns
        jf.setLayout(new GridLayout(2, 2));

        // Create Components
        JButton button1 = new JButton("Button 1");
        JButton button2 = new JButton("Button 2");
        JButton button3 = new JButton("Button 3");
        JButton button4 = new JButton("Button 4");

        // Add components to the JFrame
        jf.add(button1);
        jf.add(button2);
        jf.add(button3);
        jf.add(button4);

        // Set frame properties
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jf.setSize(300, 200);
        jf.setVisible(true);
    }
}

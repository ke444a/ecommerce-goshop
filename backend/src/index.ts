import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { errorMiddleware } from "./middleware/errorMiddleware";
import productRoutes from "./routes/products";
import usersRoutes from "./routes/users";
import checkoutRoutes from "./routes/checkout";
import ordersRoutes from "./routes/orders";
import authRoutes from "./routes/auth";
import categoryRoutes from "./routes/category";
import { webhook } from "./controllers/webhook";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: "http://localhost:5173" 
};

app.use(cors(corsOptions));
app.post("/webhook", express.raw({type: "application/json"}), webhook);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads/", express.static(path.join(process.cwd(), "/uploads/")));
app.use("/products", productRoutes);
app.use("/users", usersRoutes);
app.use("/orders", ordersRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
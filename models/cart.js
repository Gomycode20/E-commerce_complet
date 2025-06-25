import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            // Optionnel : le client peut ajouter un message pour l'artisan
            customNote: {
                type: String,
                trim: true
            },
            size: {
                type: [String]
            }
        }
    ],
    total: {
        type: Number,
        default: 0
    }
});

// Calcul automatique du total du panier
cartSchema.pre("save", async function (next) {
    await this.populate('products.product');
    this.total = this.products.reduce((acc, val) => {
        const price = val.product?.price || 0;
        return acc + price * val.quantity;
    }, 0);
    next();
});

export default mongoose.model("Cart", cartSchema);

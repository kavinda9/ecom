const Product = require('../module/Product');

const readProduct = async (req, res) => {
    const {vendorId} = req.body;
    
    try{
        const products = await Product.find({vendorId});
        if(products) {
            return res.send({success: true, products})}
        else { 
            return res.send({success: false, message: "Invalid product"})
        };
    }catch(error) {
        res.send({success: false, message: error.message});
    }

}

const getProducts = async (req,res) => {
    try {
        const products = await Product.find();

        if(!products) {
            return res.send({success: false});
        }

        res.send({success: true, products});

    } catch (error) {
        return res.send({success: false, message: error.message})
    }
};

const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      brand,
      rating,
      stockQuantity,
      vendorId
    } = req.body;

    let mainImage = '';
    let variations = [];

    const files = req.files || [];

    // 1. Get main product image (fieldname === "image")
    const imageFile = files.find(file => file.fieldname === 'image');
    if (imageFile) {
      mainImage = imageFile.path; // Cloudinary URL
    }

    // 2. Parse variations JSON string
    if (req.body.variations) {
      variations = JSON.parse(req.body.variations);

      // 3. Get variationImages (multiple files with same fieldname)
      const variationImages = files.filter(file => file.fieldname === 'variationImages');

      // 4. Map each uploaded image to variations by index
      variations.forEach((variation, index) => {
        variation.image = variationImages[index]?.path || ''; // Assign Cloudinary URL
      });
    }

    // 5. Create product
    const product = new Product({
      title,
      description,
      price,
      category,
      brand,
      rating,
      image: mainImage,
      variations,
      stockQuantity,
      vendorId
    });

    const saved = await product.save();

    return res.status(200).json({ success: true, message: "Product created", product: saved });

  } catch (error) {
    console.error("Error in createProduct:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {

        const { productId, title, description,price, category,brand, rating,  stockQuantity, vendorId} = req.body;

        try{

            let variations = [];
            let mainImage = '';

            // If no variations — simple product
            if (!req.body.variations) {
                const imageFile = req.files.find(f => f.fieldname === 'image');
                mainImage = imageFile?.path || '';
            } else {
                // Parse variations
                variations = JSON.parse(req.body.variations);

                req.files.forEach(file => {
                const match = file.fieldname.match(/image_(\d+)/);
                if (match) {
                    const index = parseInt(match[1]);
                    if (variations[index]) {
                    variations[index].image = file.path; // Add Cloudinary URL
                    }
                }
                });
            }

            let product = await Product.findById(productId);

            if(!product) {
                return res.send({success: false, message: "Product not defiened!"});
            }

            Object.assign(product, {
            title,
            description,
            price,
            image: mainImage,
            category,
            brand,
            rating,
            variations,
            stockQuantity,
            vendorId,
            });

            const response = await product.save();

            if(response) {
                res.send({success: true});
            }else {
                res.send({success: false, message: "Error updating"})
            }
        }catch(error) {
            res.send({success: false, message: error.message});
        }
        
}

const deleteProduct = async (req, res) => {

    const {productId} = req.body;

    try {
        const response = await Product.deleteOne({_id: productId});

        if(response) {
            res.send({success: true, message: "Succssfully deleted"});
        }else {
            res.send({success: false, message: "Error updating"})
        }

    } catch (error) {
        res.send({success: false, message: error.message});
    }
}

exports.createProduct = createProduct;
exports.readProduct = readProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getProducts = getProducts;
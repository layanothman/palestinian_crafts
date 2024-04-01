const productModel=require('../Models/Product');

class ProductController{
    
    static async getAllProduct(req,res){
        

        var productList= await productModel.getAllProducts();

        if (productList)
        res.send(productList);


    }



    static async filterProducts(req, res) {
        try {
            
            const { type, craft ,minPrice, maxPrice, material } = req.query;
            
            // Construct the filter conditions based on the provided parameters
            let filterConditions = {};
            
            if (type) {
                filterConditions.type = type;
            }
            if (craft) {
                filterConditions.craft = craft;
            }
            if (minPrice && maxPrice) {
                console.log("priceee")
                filterConditions.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
            }
            if (material) {
                filterConditions.material = material;
            }
    
            // Call the model function to filter products based on the filter conditions
            const filteredProducts = await productModel.filterProducts(filterConditions);
    
            res.json({ success: true, results: filteredProducts });
        } catch (error) {
            console.error('Error filtering products:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
      




    static async search(req, res) {
        try {
            const { searchType, searchTerm } = req.query;

            if (!searchType || !searchTerm) {
                return res.status(400).json({ success: false, message: 'Search type and search term are required' });
            }

            let searchResults;
            if (searchType === 'product') {
                searchResults = await productModel.searchByProductName(searchTerm);
            } else if (searchType === 'craftsman') {
                searchResults = await productModel.searchByCraftsmanName(searchTerm);
            } else {
                return res.status(400).json({ success: false, message: 'Invalid search type' });
            }

            res.json({ success: true, results: searchResults });
        } catch (error) {
            console.error('Error searching products:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    
    static async addProduct(req, res) {
       
        var id=req.body.product_id;
        var name=req.body.product_name;
        var image= req.body.image;
        var details=req.body.product_details;
        var price=req.body.price;
        var quantity=req.body.quantity;
        var type=req.body.type;
        var craft=req.body.craft;
        var material=req.body.material;
        var uid=req.body.uid;



        var x=await productModel.addProduct(id,name,image,details,price,quantity,type,craft,material,uid);
        if(x==true)
        res.send("Add Successfully")
        else
        res.send("Add Failed")


    }
    

    static async updateProduct(req, res) {
        var id=req.body.product_id;
        var newname=req.body.product_name;
        var newimage= req.body.image;
        var newdetails=req.body.product_details;
        var newprice=req.body.price;
        var newquantity=req.body.quantity;
        var newtype=req.body.type;
        var newcraft=req.body.craft;
        var newmaterial=req.body.material;
        var newuid=req.body.uid;
        

        var x= await productModel.editProduct(id,newname,newimage,newdetails,newprice,newquantity,newtype,newcraft,newmaterial,newuid)
        if(x)
        res.send("Successfully Updated product")
        else{
            res.send("Failed to Update product information")

        }


    }

    static async deleteProduct(req, res) {

        const id=req.body.product_id;
        
        if(id)
        {
            var result=await productModel.deleteProduct(id);
            if(result)
            res.send("Successfully deleted product")
            else{
                res.send("Failed to delete product")
    
            }
        }






    }

    static async buyProduct(req, res) {
        try {
            
            const { product_id, uid, email, address } = req.body;
            const purchaseResult = await productModel.buyProduct(product_id, uid, email, address);
            if (purchaseResult.success) {
                res.json({ success: true, message: "Product purchased successfully" });
            } else {
                res.status(400).json({ success: false, error: purchaseResult.error });
            }
        } catch (error) {
            console.error("Error buying product:", error);
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    }

    }












module.exports=ProductController
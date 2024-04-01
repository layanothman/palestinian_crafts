
const db =require('../Config/DB')


class ProductModel{



    static async getAllProducts(){
        console.log("first");
        return new Promise(resolve=>{

            db.query("select * from product",[],(error , result)=>{

                if(!error)
                resolve(result)

            })

        })
    }



  
    static async filterProducts(filterConditions) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM product WHERE 1 = 1'; // Start with a base query
            
            const values = []; // To store parameter values for prepared statement
            
            // Construct the SQL query dynamically based on the provided filter conditions
            if (filterConditions.type) {
                sql += ' AND type = ?';
                values.push(filterConditions.type);
            }
            if (filterConditions.craft) {
                sql += ' AND craft = ?';
                values.push(filterConditions.craft);
            }
            if (filterConditions.price) {
                sql += ' AND price >= ? AND price <= ?';
                values.push(filterConditions.price.$gte, filterConditions.price.$lte);
            }
            if (filterConditions.material) {
                sql += ' AND material = ?';
                values.push(filterConditions.material);
            }
            
            db.query(sql, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }



    static async searchByProductName(productName) {
       
        const sql = `SELECT * FROM product WHERE product_name LIKE '%${productName}%'`;
        return await this.queryDatabase(sql);
    }

    static async searchByCraftsmanName(craftsmanName) {
        const sql = `SELECT * FROM product WHERE uid IN (SELECT uid FROM user WHERE username LIKE '%${craftsmanName}%')`;
        return await this.queryDatabase(sql);
    }

    static async queryDatabase(sql) {
        return new Promise((resolve, reject) => {
            db.query(sql, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }


    static async addProduct(id,name, image,details, price, quantity ,type , craft ,material, uid){

        return new Promise(resolve => {
            db.query("insert into product(product_id, product_name,image, product_details,price , quantity, type,craft,material,uid) values (?,?,?,?,?,?,?,?,?,?) ",[id,name, image,details, price, quantity ,type , craft ,material, uid],(e,r)=> {
                if (!e) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
        

    }


    static async editProduct(id,name, image,details, price, quantity ,type , craft ,material, uid){

        return new Promise(resolve => {
            db.query("update product set  product_name=?,image=?, product_details=?,price=? , quantity=?, type=?,craft=?,material=?,uid=? where product_id=? ",[name, image,details, price, quantity ,type , craft ,material, uid,id],(error,result)=> {
                if(!error)
                resolve(result)

        })

    })
    
}


static async deleteProduct(id){
    

    return new Promise(resolve => {
        db.query("delete from product where product_id=?",[id],(error,result)=>{
            if(error)
            resolve(false)
            else
            resolve(true)

        })
    })

}

static async buyProduct(productId, userId, email, address) {
    return new Promise((resolve, reject) => {
        // Check product availability
        const getProductQuery = "SELECT * FROM product WHERE product_id = ?";
        db.query(getProductQuery, [productId], (error, results) => {
            if (error) {
                console.error("Error checking product availability:", error);
                reject({ success: false, error: "Internal server error" });
            } else {
                if (results.length === 0) {
                    resolve({ success: false, error: "Product not found" });
                } else {
                    const product = results[0];
                    if (product.quantity > 0) {
                        // Update product quantity
                        const updateProductQuery = "UPDATE product SET quantity = quantity - 1 WHERE product_id = ?";
                        db.query(updateProductQuery, [productId], (updateError, updateResult) => {
                            if (updateError) {
                                console.error("Error updating product quantity:", updateError);
                                reject({ success: false, error: "Internal server error" });
                            } else {
                                // Insert order into the database
                                const order = {
                                    total_products:  productId,
                                    uid: userId,
                                    email: email,
                                    address: address,
                                    total_price:product.price,
                                    placed_on: new Date()
                                };
                                const insertOrderQuery = "INSERT INTO orders SET ?";
                                db.query(insertOrderQuery, order, (insertError, insertResult) => {
                                    if (insertError) {
                                        console.error("Error inserting order:", insertError);
                                        reject({ success: false, error: "Internal server error" });
                                    } else {
                                        resolve({ success: true });
                                    }
                                });
                            }
                        });
                    } else {
                        resolve({ success: false, error: "Product is out of stock" });
                    }
                }
            }
        });
    });
}



}

module.exports=ProductModel
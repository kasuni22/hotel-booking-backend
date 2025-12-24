import Category from "../models/category.js";
import {isAdminValid} from "./userControllers.js";

//create Category

export async function createCategory(req, res, next) {
    try {
        // if(req.user == null){
        //     res.status(401);
        //     throw new Error("Unauthorized");
        // }
        
        // if(req.user.type != "admin"){
        //     res.status(403);
        //     throw new Error("Forbidden");
        // }

        const newCategory = new Category(req.body);
        await newCategory.save();
        
        res.json({
            message: "Category created successfully",
            result: newCategory
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400);
            next(new Error("Category name must be unique"));
        } else {
            next(error);
        }
    }
}

export async function deleteCategory(req, res, next) {
  try {
    const id = req.params.id

    const result = await Category.findByIdAndDelete(id)

    if (!result) {
      return res.status(404).json({ message: "Category not found" })
    }

    res.json({ message: "Category deleted successfully" })
  } catch (error) {
    next(error)
  }
}


export async function getCategory(req, res, next) {
    try {
        const categories = await Category.find();
        res.json({
            categories: categories
        });
    } catch (error) {
        next(error);
    }
}

export async function getCategoryById(req, res, next) {
  try {
    const category = await Category.findById(req.params.id)

    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    res.json({ category })
  } catch (error) {
    next(error)
  }
}

// get Category By Price

export function getCategoryByPrice(req, res) {
    const { minPrice, maxPrice } = req.query;
    
    let query = {};
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    Category.find(query)
        .then((categories) => {
            res.json({
                message: "Categories retrieved successfully",
                categories: categories
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to retrieve categories",
                error: err
            });
        });
}

// update Category

export async function updateCategory(req, res) {
  const id = req.params.id

  Category.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.json({ message: "Category updated successfully" })
    })
    .catch(() => {
      res.status(500).json({ message: "Failed to update category" })
    })
}



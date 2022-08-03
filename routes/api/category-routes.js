const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',async (req, res) => {
  // find all categories  
  // be sure to include its associated Products
  await Category.findAll({
    include:[{
      model: Product,
    }]
  }).then(data=>{
    res.json(data)
  }).catch(err=>{
    res.status(500).json({msg: "Oh no! Error!", err})
  })

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include:[{
      model: Product,
    }]
  }).then(category=>{
    if(!category){
      return res.status(404).json({msg:"Category does not exist."})
    }
    res.json(category)
  }).catch(err=>{
      res.status(500).json({
        msg:"Internal server error",
        err
      })
  })
});

router.post('/',async (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create({
      category_name:req.body.category_name,
    })
    res.status(201).json(newCategory)
  }catch(err){
    console.log(err)
    res.status(500).json({
      msg:"Internal server error",
      err
    })
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name:req.body.category_name,
  },
    {
      where:{
        id:req.params.id
      }
    }).then(category=>{
      if(!category[0]){
        return res.status(404).json({msg:"No such category to edit."})
      }
      res.json(category)
    }).catch(err=>{
      res.status(500).json({
        msg:"Internal server error",
        err
      })
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
        where:{
            id:req.params.id
        }
        }).then(category=>{
            if(!category){
                return res.status(404).json({msg:"No such category to delete!"})
            }
        res.json(category)
    }).catch(err=>{
        res.status(500).json({
            msg:"Internal server error",
            err
        })
    })
});

module.exports = router;

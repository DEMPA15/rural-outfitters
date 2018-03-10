SELECT b.quantity,
    b.date_created,
    p.product_id as "product_product_id",
    p.name as "product_name",
    p.price as "product_price",
    p.description as "product_description",
    p.img as "product_img",
    p.specs as "product_specs"
FROM basket b
INNER JOIN product p ON b.product_id = p.product_id
WHERE user_id = ${userId};
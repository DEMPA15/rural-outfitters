INSERT INTO basket (
    user_id,
    product_id,
    quantity,
    date_created
)
VALUES (
    ${userId},
    ${productId},
    ${quantity},
    ${date}
);
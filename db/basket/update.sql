UPDATE basket
    SET quantity = ${quantity}
    WHERE user_id = ${userId}
        AND product_id = ${productId};
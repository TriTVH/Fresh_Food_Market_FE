export const mapProductDtoToFrontend = (productDto) => {
    // Extract first image url if available
    let imageUrl = 'https://placehold.co/400x400?text=Product';
    if (productDto.imagesJson && productDto.imagesJson.length > 0) {
        // Assume imagesJson is an array of objects which has Url or ImageUrl property
        const firstImage = productDto.imagesJson[0];
        imageUrl = firstImage.url || firstImage.Url || firstImage.imageUrl || firstImage.ImageUrl || imageUrl;
        if (!imageUrl.startsWith('http')) {
            imageUrl = 'http://localhost:5000' + imageUrl; // fallback to gateway/BE url if it's relative
        }
    }

    return {
        id: productDto.productId,
        name: productDto.productName,
        category: productDto.categoryName || '',
        subcategory: productDto.subCategoryName || '',
        price: productDto.priceSell,
        originalPrice: null, // Assume no original price logic in DTO
        discount: 0,
        rating: productDto.ratingAverage || 5, // fallback
        reviewCount: productDto.ratingCount || 0,
        soldCount: productDto.soldCount || 0,
        image: imageUrl,
        isOrganic: productDto.isOrganic || false,
        inStock: productDto.isAvailable && productDto.quantity > 0,
    };
};

export const matchCategory = (categoryName, categoryId) => {
    if (!categoryName) return false;
    const cat = categoryName.toLowerCase();
    if (categoryId === 'vegetables') return cat.includes('rau') || cat.includes('củ') || cat.includes('nấm');
    if (categoryId === 'fruits') return cat.includes('trái') || cat.includes('quả');
    if (categoryId === 'seafood' || categoryId === 'meatSeafood') return cat.includes('thịt') || cat.includes('cá') || cat.includes('hải sản');
    if (categoryId === 'dryFood' || categoryId === 'driedFood') return cat.includes('khô');
    return true;
};

// ==================== NEWS MAPPER ====================
export const mapNewsDtoToFrontend = (newsDto) => {
    return {
        id: newsDto.newsId,
        title: newsDto.title,
        excerpt: newsDto.content.substring(0, 150) + '...', // truncate for excerpt
        image: newsDto.image || 'https://placehold.co/800x450?text=News',
        date: newsDto.publishDate ? new Date(newsDto.publishDate).toLocaleDateString('vi-VN') : 'Unknown',
        author: 'Admin', // static or map from backend if exists
        category: newsDto.category || 'Tin Tức'
    };
};

// ==================== VOUCHER MAPPER ====================
/** API: validFrom = ngưỡng đơn tối thiểu theo nghìn đ (300 → 300.000đ); discountAmount = trần giảm (null = không trần theo %) */
export const mapVoucherToFrontend = (voucherDto) => {
    const validFrom = voucherDto.validFrom
    const minOrder =
        validFrom == null ? 0 : validFrom < 10000 ? validFrom * 1000 : validFrom

    const rawCap = voucherDto.discountAmount
    const maxDiscount = rawCap != null && rawCap > 0 ? rawCap : null

    return {
        id: voucherDto.voucherId,
        code: voucherDto.voucherCode,
        title: voucherDto.voucherName || 'Khuyến mãi đặc biệt',
        discount: voucherDto.discountPercentage || 0,
        maxDiscount,
        minOrder,
        description: voucherDto.description || '',
    }
}

// ==================== ORDER MAPPER ====================
export const mapOrderDtoToFrontend = (orderDto) => {
    const rawStatus = orderDto.orderStatus || orderDto.status || 'PENDING';
    const items = Array.isArray(orderDto.items) ? orderDto.items : [];
    const subtotal =
        orderDto.subtotal != null
            ? orderDto.subtotal
            : items.reduce((sum, item) => sum + (item.subTotal || item.subtotal || 0), 0);
    const discountAmount = orderDto.discountAmount != null ? orderDto.discountAmount : 0;
    const shippingFee = orderDto.shippingFee != null ? orderDto.shippingFee : 0;
    const totalAmount =
        orderDto.totalAmount != null ? orderDto.totalAmount : subtotal - discountAmount + shippingFee;

    return {
        order_id: orderDto.orderId,
        order_date: orderDto.createdAtUtc || orderDto.createdDate || orderDto.createdAt,
        status: typeof rawStatus === 'string' ? rawStatus.toLowerCase() : 'pending',
        subtotal,
        discount_amount: discountAmount,
        shipping_fee: shippingFee,
        total_amount: totalAmount,
        items: items.map(item => ({
            id: item.productId,
            name: item.productName || 'Unknown Product',
            price: item.price,
            quantity: item.quantity,
            // Fallback image
            image: 'https://placehold.co/200x200?text=Item' 
        })),
        shipping_address: {
            full: orderDto.shippingAddress || ''
        },
        payment_method: orderDto.paymentMethod,
        shipping_name: orderDto.shippingName || '',
        shipping_phone: orderDto.shippingPhone || '',
        transaction_status: orderDto.transactionStatus || '',
    };
};

// ==================== BATCH MAPPER ====================
export const mapBatchDtoToFrontend = (batchDto) => {
    return {
        id: batchDto.batchCode || `BATCH-${batchDto.batchId}`,
        supplier: batchDto.supplierName || batchDto.supplyBy || 'Unknown Supplier',
        phone: batchDto.supplierPhone || '',
        totalQty: batchDto.totalItems || 0,
        totalValue: batchDto.batchDetails?.reduce((sum, it) => sum + (it.price || 0) * it.quantity, 0) || 0,
        createdDate: batchDto.createdDate ? new Date(batchDto.createdDate).toLocaleDateString('vi-VN') : '—',
        deliveryDate: batchDto.deliveredDate ? new Date(batchDto.deliveredDate).toLocaleDateString('vi-VN') : '—',
        status: batchDto.status || 'Chờ Nhập',
        items: (batchDto.batchDetails || []).map(it => ({
            product: it.productName || `Product #${it.productId}`,
            qty: it.quantity,
            remaining: it.quantity, // backend usually tracks this elsewhere but for now
            price: 0, // DTO doesn't have cost price per item
            expiry: it.expiredDate || '—'
        }))
    };
};



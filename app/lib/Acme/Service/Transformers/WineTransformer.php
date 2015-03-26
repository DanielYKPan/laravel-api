<?php


namespace Acme\Service\Transformers;


class WineTransformer extends Transformer {

    /**
     * Transform a signal object
     *
     * @param $wine
     * @return array
     */
    public function transform($wine)
    {
        return [
            'id' => $wine['id'],
            'name' => $wine['name'],
            'code' => $wine['product_code'],
            'image' => $wine['image_path'],
            'price' => (double)$wine['price'],
            'discount_price'=> (double)$wine['discount_price'],
            'case_size' => $wine['package_size'],
            'availability' => $wine['availability'],
            'country' => $wine['country']['name'],
            'type' => $wine['type']['name'],
            'wine_detail' => $wine['wine_detail']
        ];
    }
} 
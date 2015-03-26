<?php


namespace Acme\Service\Transformers;


class WineDetailTransformer extends Transformer {

    /**
     * Transform a signal object
     *
     * @param $wine
     * @return array
     */
    public function transform($wineDetail)
    {
        return [
            'unique_selling_points' => [$wineDetail['usp_1'], $wineDetail['usp_2'], $wineDetail['usp_3']],
            'alcohol' => $wineDetail['alcohol']
        ];
    }
} 
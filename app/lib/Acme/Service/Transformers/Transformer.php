<?php

namespace Acme\Service\Transformers;

abstract class Transformer {

    /**
     * Transform A Collection
     *
     * @param $items
     * @return array
     */
    public function transformCollection($items)
    {
        return array_map([$this, 'transform'], $items);
    }

    public abstract function transform($item);

} 
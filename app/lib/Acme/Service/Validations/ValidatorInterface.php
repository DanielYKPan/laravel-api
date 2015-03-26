<?php
namespace Acme\Service\Validations;


use Acme\Service\Exception\FormValidationException;

interface ValidatorInterface {

    /**
     * Set data to validate
     *
     * @param array $input
     * @return $this
     */
    public function with(array $input);

    /**
     *  Validate passes or fails
     *
     * @return void
     */
    public function validates();

    /**
     *  Return validation rules
     *
     * @return Array
     */
    public function getRules();

    /**
     *  Return custom validation message
     *
     * @return Array
     */
    public function getMessages();
}
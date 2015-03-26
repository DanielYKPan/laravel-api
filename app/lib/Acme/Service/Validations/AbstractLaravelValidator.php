<?php


namespace Acme\Service\Validations;

use Illuminate\Validation\Factory as Validator;
use Acme\Service\Exception\FormValidationException;

abstract class AbstractLaravelValidator implements ValidatorInterface {

    /**
     * Validator
     *
     * @var \Illuminate\Validation\Factory
     */
    protected $validator;

    /**
     * Validation data key=>value array
     *
     * @var Array
     */
    protected $input = array();

    /**
     *  Validation rules
     *
     * @var Array
     */
    protected $rules = array();

    /**
     *  Custom validation messages
     *
     * @var Array
     */
    protected $messages = array();

    public function __construct(Validator $validator)
    {
        $this->validator = $validator;
    }


    /**
     * Set data to validate
     *
     * @param array $input
     * @return $this
     */
    public function with(array $input)
    {
        $this->input = $input;
        return $this;
    }

    /**
     *  Validate passes or fails
     *
     * @return void
     */
    public function validates()
    {
        $validator = $this->validator->make(
            $this->input,
            $this->getRules(),
            $this->getMessages()
        );

        // if the validation fails, throw a 'FormValidationException'
        if($validator->fails())
            throw new FormValidationException($validator);
    }

    /**
     *  Return validation rules
     *
     * @return Array
     */
    public function getRules()
    {
        return $this->rules;
    }

    /**
     *  Return custom validation message
     *
     * @return Array
     */
    public function getMessages()
    {
        return $this->messages;
    }
}
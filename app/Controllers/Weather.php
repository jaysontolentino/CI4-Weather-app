<?php
namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

class Weather extends ResourceController
{
    use ResponseTrait;

    public function index()
    {

        $client = \Config\Services::curlrequest();

        $apiKey = "ccdc9ae551ddb55267469e5a4a48724c";

        $longitude = $this->request->getVar('lon');
        $latitude = $this->request->getVar('lat');

        try {

            $response =  $client->get("api.openweathermap.org/data/2.5/weather?lat={$latitude}&lon={$longitude}&units=metric&appid={$apiKey}", [
                "headers" => [
                    "Accept" => "application/json"
                ]
            ]);

        } catch(\Exception $e) {

            return $this->failNotFound('Location not found');

        }

        return $this->respond(json_decode($response->getBody()));
    }
}

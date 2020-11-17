<?php

namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Config\Definition\Exception\Exception;
class ProfilesController extends AbstractController {
    
    /**
     * @Route("/profiles", name="profiles")
     */
        public function index(): Response
    {
        return $this->render('profiles/index.html.twig', [
            'controller_name' => 'ProfilesController',
        ]);
    }

    /**
     * @Route("/profiles/{username}", name="user_profile_search")
     */

    public function update(): Response
    {
        // get base from url and extract it as username var
        $uri = $_SERVER['REQUEST_URI'];
        $username = basename($uri);
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, "https://api.github.com/users/$username");
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_USERAGENT, "Accessing Github user.");
        $result = json_decode(curl_exec($curl), 1);
        return $this->JSON($result);
    }
}

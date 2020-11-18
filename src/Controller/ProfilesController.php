<?php

namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Config\Definition\Exception\Exception;
class ProfilesController extends AbstractController {
    
    /**
     * @Route("/profile", name="profiles")
     */
        public function index(): Response
    {
        return $this->render('profiles/index.html.twig', [
            'controller_name' => 'ProfilesController',
        ]);
    }

    /**
     * @Route("/profile/{username}", name="user_profile_search")
     */

    public function retrieve_user_data(): Response
    {
        // get base from url and extract it as username var
        $uri = $_SERVER['REQUEST_URI'];
        $username = basename($uri);
        $curl = curl_init();
        curl_setopt_array($curl, [CURLOPT_URL => "https://api.github.com/users/$username",
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_USERAGENT => "Accessing Github users info."]);
        $result = json_decode(curl_exec($curl), 1);
        return $this->JSON($result);
    }
}

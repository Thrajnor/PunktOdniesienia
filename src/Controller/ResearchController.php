<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ResearchController extends AbstractController
{
    /**
     * @Route("/Badanie", name="research")
     */
    public function research()
    {
        $this->addFlash('info', 'Some useful info');

        return $this->render('research/index.html.twig');
    }
    /**
     * @Route("/", name="index")
     */
    public function index()
    {
        return $this->render('index.html.twig');
    }
}

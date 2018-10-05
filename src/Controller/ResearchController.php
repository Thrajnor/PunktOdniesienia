<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ResearchController extends AbstractController
{
    /**
     * @Route("/", name="research")
     */
    public function research()
    {
        $question1 = array(
            'questionText' => 'Jaki obrazek przywodzi Ci na myśl imię Laura?',
            'questionName' => 'laura',
        );
        $question2 = array(
            'questionText' => 'Jaki obrazek przywodzi Ci na myśl imię Stanisław?',
            'questionName' => 'Stanislaw',
        );

        $questions = array(
            $question1,
            $question2,
        );


        // $this->addFlash('success', 'Some useful info');
        return $this->render(
            'index.html.twig',
            array('questions' => $questions)
        );
    }
}

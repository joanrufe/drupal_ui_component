<?php

namespace Drupal\drupal_ui_component\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityManagerInterface;
use Drupal\user\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class UserApiController.
 */
class UserApiController extends ControllerBase {

  /**
   * Drupal\Core\Entity\EntityManagerInterface definition.
   *
   * @var \Drupal\Core\Entity\EntityManagerInterface
   */
  protected $entityManager;

  /**
   * Constructs a new UserApiController object.
   */
  public function __construct(EntityManagerInterface $entity_manager) {
    $this->entityManager = $entity_manager;
    $this->style = $entity_manager->getStorage('image_style')->load('thumbnail');
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity.manager')
    );
  }

  private function prepareJSON($users){
    $res = [];
    foreach ($users as $user){
      $res[] = $this->parseUser($user);
    }
    return $res;
  }

  private function parseUser(User $user){
    $res = new \stdClass;
    $res->uid = (int)$user->get('uid')->getString();
    $res->name = $user->get('name')->getValue()[0]['value'];
    $res->created = $user->get('created')->getString();
    $res->avatar = $this->style->buildUrl( $user->user_picture->entity->uri->value );
    return $res;
  }

  /**
   * Get_users_with_photo.
   *
   * @return string
   *   Return Hello string.
   */
  public function get_users_with_photo() {
    $usersStorage = $this->entityManager->getStorage('user');
    $users = $usersStorage->loadMultiple();
    $json = $this->prepareJSON($users);;
    return new JsonResponse($json);

  }

}

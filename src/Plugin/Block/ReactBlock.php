<?php

namespace Drupal\drupal_ui_component\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a Custom React Block .
 *
 * @Block(
 *  id = "react_component",
 *  admin_label = @Translation("React Component"),
 * )
 */
class ReactBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $block_id = "block". $this->getBaseId();
    $build = [];
    $build['app']['#markup'] = '<div id="'.$block_id.'">Loading ...</div>';
    $build['#attached']['drupalSettings']['block_id'] = $block_id;
    $build['#attached']['library'][] = 'drupal_ui_component/datepicker';

    return $build;
  }
}

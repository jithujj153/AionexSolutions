<?php
/**
 * Plugin Name: AIONEX Core Loader
 * Description: Loads AIONEX Core as a must-use plugin (no Activate required).
 * Version: 1.0.3
 * Author: AIONEX
 */

if (!defined('ABSPATH')) {
    exit;
}

$aionex_core = __DIR__ . '/aionex-core/aionex-core.php';
if (file_exists($aionex_core)) {
    require_once $aionex_core;
}

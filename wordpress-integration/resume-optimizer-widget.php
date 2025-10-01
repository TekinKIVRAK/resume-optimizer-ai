<?php
/**
 * Plugin Name: Resume Optimizer AI Widget
 * Plugin URI: https://mindtrellis.com/ai-tools/resume-optimizer/
 * Description: AI-powered resume analyzer widget powered by Claude AI
 * Version: 1.0.0
 * Author: TekinKIVRAK
 * Author URI: https://mindtrellis.com
 * License: MIT
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('RESUME_OPTIMIZER_VERSION', '1.0.0');
define('RESUME_OPTIMIZER_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('RESUME_OPTIMIZER_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Enqueue widget assets
 */
function resume_optimizer_enqueue_assets() {
    // Only enqueue on pages that use the shortcode
    global $post;
    if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'resume_optimizer')) {
        // Enqueue CSS
        wp_enqueue_style(
            'resume-optimizer-widget',
            RESUME_OPTIMIZER_PLUGIN_URL . 'assets/widget.css',
            array(),
            RESUME_OPTIMIZER_VERSION
        );

        // Enqueue JS
        wp_enqueue_script(
            'resume-optimizer-widget',
            RESUME_OPTIMIZER_PLUGIN_URL . 'assets/widget.js',
            array(),
            RESUME_OPTIMIZER_VERSION,
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'resume_optimizer_enqueue_assets');

/**
 * Resume Optimizer shortcode
 * Usage: [resume_optimizer]
 */
function resume_optimizer_shortcode($atts) {
    // Parse attributes
    $atts = shortcode_atts(array(
        'title' => 'Resume Optimizer AI',
        'subtitle' => 'Get instant AI-powered feedback on your resume'
    ), $atts);

    // Generate unique container ID
    $container_id = 'resume-optimizer-' . uniqid();

    // Output HTML
    ob_start();
    ?>
    <div class="resume-optimizer-container" id="<?php echo esc_attr($container_id); ?>">
        <div class="resume-optimizer-header">
            <h2><?php echo esc_html($atts['title']); ?></h2>
            <?php if (!empty($atts['subtitle'])): ?>
                <p><?php echo esc_html($atts['subtitle']); ?></p>
            <?php endif; ?>
        </div>
        <div id="root"></div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('resume_optimizer', 'resume_optimizer_shortcode');

/**
 * Add custom CSS for widget container
 */
function resume_optimizer_custom_css() {
    ?>
    <style>
        .resume-optimizer-container {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 2rem;
        }

        .resume-optimizer-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .resume-optimizer-header h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 0.5rem;
        }

        .resume-optimizer-header p {
            font-size: 1.125rem;
            color: #6b7280;
        }

        @media (max-width: 768px) {
            .resume-optimizer-container {
                padding: 1rem;
            }

            .resume-optimizer-header h2 {
                font-size: 1.5rem;
            }

            .resume-optimizer-header p {
                font-size: 1rem;
            }
        }
    </style>
    <?php
}
add_action('wp_head', 'resume_optimizer_custom_css');

/**
 * Admin notice for setup instructions
 */
function resume_optimizer_admin_notice() {
    if (get_option('resume_optimizer_setup_notice', true)) {
        ?>
        <div class="notice notice-success is-dismissible">
            <p><strong>Resume Optimizer AI activated!</strong></p>
            <p>Use the shortcode <code>[resume_optimizer]</code> on any page to display the widget.</p>
            <p>Example: <code>[resume_optimizer title="Analyze Your Resume" subtitle="Get AI-powered feedback"]</code></p>
        </div>
        <?php
        update_option('resume_optimizer_setup_notice', false);
    }
}
add_action('admin_notices', 'resume_optimizer_admin_notice');

/**
 * Plugin activation hook
 */
function resume_optimizer_activate() {
    update_option('resume_optimizer_setup_notice', true);
}
register_activation_hook(__FILE__, 'resume_optimizer_activate');

/**
 * Plugin deactivation hook
 */
function resume_optimizer_deactivate() {
    delete_option('resume_optimizer_setup_notice');
}
register_deactivation_hook(__FILE__, 'resume_optimizer_deactivate');
<?php

namespace GeminiLabs\SiteReviews\Migrations;

use GeminiLabs\SiteReviews\Contracts\MigrateContract;
use GeminiLabs\SiteReviews\Controllers\NoticeController;
use GeminiLabs\SiteReviews\Database\OptionManager;
use GeminiLabs\SiteReviews\Helpers\Arr;

class Migrate_4_5_0 implements MigrateContract
{
    /**
     * Run migration.
     */
    public function run(): bool
    {
        $this->migrateOptions();
        $this->migrateSettings();
        $this->migrateUserMeta();
        return true;
    }

    protected function migrateOptions(): void
    {
        $isAccountVerified = glsr(OptionManager::class)->getWP('_glsr_rebusify', false);
        update_option('_glsr_trustalyze', $isAccountVerified);
        delete_option('_glsr_rebusify');
    }

    protected function migrateSettings(): void
    {
        if ($settings = get_option(OptionManager::databaseKey(4))) {
            $settings = Arr::set($settings, 'settings.general.trustalyze',
                Arr::get($settings, 'settings.general.rebusify')
            );
            $settings = Arr::set($settings, 'settings.general.trustalyze_email',
                Arr::get($settings, 'settings.general.rebusify_email')
            );
            $settings = Arr::set($settings, 'settings.general.trustalyze_serial',
                Arr::get($settings, 'settings.general.rebusify_serial')
            );
            unset($settings['settings']['general']['rebusify']);
            unset($settings['settings']['general']['rebusify_email']);
            unset($settings['settings']['general']['rebusify_serial']);
            update_option(OptionManager::databaseKey(4), $settings);
        }
    }

    protected function migrateUserMeta(): void
    {
        $metaKey = NoticeController::USER_META_KEY;
        $userIds = get_users([
            'fields' => 'ID',
            'meta_compare' => 'EXISTS',
            'meta_key' => $metaKey,
        ]);
        foreach ($userIds as $userId) {
            $meta = (array) get_user_meta($userId, $metaKey, true);
            if (array_key_exists('rebusify', $meta)) {
                $meta['trustalyze'] = $meta['rebusify'];
                unset($meta['rebusify']);
                update_user_meta($userId, $metaKey, $meta);
            }
        }
    }
}

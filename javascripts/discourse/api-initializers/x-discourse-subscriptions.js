import { apiInitializer } from "discourse/lib/api";
import { computed } from "@ember/object";
import { htmlSafe } from "@ember/template";
import I18n from "I18n";

export default apiInitializer("1.8.0", (api) => {
  api.modifyClass("controller:subscriptions", {
    pluginId: "x-discourse-subscriptions",

    pricingTableHtml(pricingTableId) {
      const publishableKey =
        this.siteSettings.discourse_subscriptions_public_key;

      if (this.currentUser) {
        return `<stripe-pricing-table
                pricing-table-id="${pricingTableId}"
                publishable-key="${publishableKey}"
                customer-email="${this.email}"></stripe-pricing-table>`;
      } else {
        return `<stripe-pricing-table
                pricing-table-id="${pricingTableId}"
                publishable-key="${publishableKey}"
                ></stripe-pricing-table>`;
      }
    },

    pricingTable: computed("email", function () {
      try {
        const pricingTableId =
          this.siteSettings.discourse_subscriptions_pricing_table_id;
        const publishableKey =
          this.siteSettings.discourse_subscriptions_public_key;
        const pricingTableEnabled =
          this.siteSettings.discourse_subscriptions_pricing_table_enabled;

        if (!pricingTableEnabled || !pricingTableId || !publishableKey) {
          throw new Error("Pricing table not configured");
        }

        if (settings.pricing_tables) {
          const pricingTables = JSON.parse(settings.pricing_tables);
          const pricingTablesHTML = pricingTables.map((pricingTable) => {
            return `<h2>${pricingTable.title}</h2>${this.pricingTableHtml(
              pricingTable.table_id
            )}`;
          });
          return htmlSafe(pricingTablesHTML);
        } else {
          return htmlSafe(this.pricingTableHtml(pricingTableId));
        }
      } catch (error) {
        return I18n.t("discourse_subscriptions.subscribe.no_products");
      }
    }),
  });
});

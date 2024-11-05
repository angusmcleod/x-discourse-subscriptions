import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import DButton from "discourse/components/d-button";
import SubscriptionInvoicesModal from "./modal/subscription-invoices";

export default class SubscriptionInvoicesBtn extends Component {
  @service modal;

  @action
  showModal() {
    this.modal.show(SubscriptionInvoicesModal, { model: this.args });
  }

  <template>
    <DButton
      @class="discourse-subscriptions-invoices-btn btn-primary"
      @action={{this.showModal}}
      @icon="file-alt"
      @label={{themePrefix "discourse_subscriptions.user.invoices.btn.label"}}
      @title={{themePrefix "discourse_subscriptions.user.invoices.btn.title"}}
    />
  </template>
}

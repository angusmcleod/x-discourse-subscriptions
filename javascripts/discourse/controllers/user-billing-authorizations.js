import Controller from "@ember/controller";
import { notEmpty } from "@ember/object/computed";
import { inject as service } from "@ember/service";

export default class UserBillingAuthorizationsController extends Controller {
  @notEmpty("model.subscription_domains") hasAuthorizations;
}

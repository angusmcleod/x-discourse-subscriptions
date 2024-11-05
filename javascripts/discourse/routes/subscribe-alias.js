import DiscourseRoute from "discourse/routes/discourse";
import { service } from "@ember/service";

export default class SubscribeAlias extends DiscourseRoute {
  @service router;

  afterModel() {
    return this.router.replaceWith("subscribe");
  }
}

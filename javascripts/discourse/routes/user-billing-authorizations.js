import DiscourseRoute from "discourse/routes/discourse";

export default class UserBillingAuthorizations extends DiscourseRoute {
  model() {
    return this.modelFor("user");
  }
}

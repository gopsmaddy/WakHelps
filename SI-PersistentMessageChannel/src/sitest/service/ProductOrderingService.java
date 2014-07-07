package sitest.service;

/**
 * This is a basic service that allows products to be ordered.
 */
public interface ProductOrderingService
{

  /**
   * Order the product indicated. The user will be emailed when the product is
   * successfully ordered.
   * 
   * @param productId
   *          id of product to order.
   * @param userEmailAddress
   *          email address of user.
   * @param doFail
   *          if this is set to true then a runtime exception will occur before
   *          the transaction commits. This will simulate an error occurring and
   *          show that the email is not sent in this case.
   */
  public void orderProduct(String productId, String userEmailAddress,
      boolean doFail);

}

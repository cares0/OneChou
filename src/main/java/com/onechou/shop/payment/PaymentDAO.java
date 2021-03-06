package com.onechou.shop.payment;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.onechou.shop.cart.CartDTO;
import com.onechou.shop.member.MemberDTO;

@Repository
public class PaymentDAO {

	@Autowired
	private SqlSession sqlSession;
	
	private final String NAMESPACE = "com.onechou.shop.payment.PaymentDAO.";
	
	public CartDTO getCartDetail(CartDTO cartDTO) throws Exception {
		return sqlSession.selectOne(NAMESPACE+"getCartDetail", cartDTO);
	}
	
	public int addPayment(PaymentDTO paymentDTO) throws Exception {
		return sqlSession.insert(NAMESPACE+"addPayment", paymentDTO);
	}
	
	public int addPaidProduct(PaidProductDTO paidProductDTO) throws Exception {
		return sqlSession.insert(NAMESPACE+"addPaidProduct", paidProductDTO);
	}
	
	public int addDelivery(DeliveryDTO deliveryDTO) throws Exception {
		return sqlSession.insert(NAMESPACE+"addDelivery", deliveryDTO);
	}
	
	public int deleteCart(CartDTO cartDTO) throws Exception {
		return sqlSession.delete(NAMESPACE+"deleteCart", cartDTO);
	}
	
	public int updatePurchaseCount(PaidProductDTO paidProductDTO) throws Exception {
		return sqlSession.update(NAMESPACE+"updatePurchaseCount", paidProductDTO);
	}
	
	public List<PaymentDTO> list(HashMap<String, Object> hashMap) throws Exception {
		return sqlSession.selectList(NAMESPACE+"list", hashMap);
	}
	
	public Long getTotal(MemberDTO memberDTO) throws Exception {
		return sqlSession.selectOne(NAMESPACE+"getTotal", memberDTO);
	}
	
	public PaymentDTO detail(PaymentDTO paymentDTO) throws Exception {
		return sqlSession.selectOne(NAMESPACE+"detail", paymentDTO);
	}
	
	public List<PaymentDTO> getShipmentProductList(HashMap<String, Object> hashMap) throws Exception {
		return sqlSession.selectList(NAMESPACE+"getShipmentProductList", hashMap);
	}
	
	public Long getShipmentTotalCount(HashMap<String, Object> hashMap) throws Exception {
		return sqlSession.selectOne(NAMESPACE+"getShipmentTotalCount", hashMap);
	}
	
	public PaymentDTO getShipmentProductDetail(PaidProductDTO paidProductDTO) throws Exception {
		return sqlSession.selectOne(NAMESPACE+"getShipmentProductDetail", paidProductDTO);
	}
	
	public int shipmentUpdate(PaidProductDTO paidProductDTO) throws Exception {
		return sqlSession.update(NAMESPACE+"shipmentUpdate", paidProductDTO);
	}
}

package com.onechou.shop.review;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.onechou.shop.member.MemberDTO;
import com.onechou.shop.product.ProductDTO;
import com.onechou.shop.util.Pager;

@Controller
@RequestMapping(value = "/review/**")
public class ReviewController {

	@Autowired
	private ReviewService reviewService;
	
	@PostMapping("add")
	public ModelAndView add(HttpServletRequest request, ProductDTO productDTO) throws Exception {
		ModelAndView mv = new ModelAndView();
		
		HttpSession session = request.getSession();
		String referer = request.getHeader("Referer");
		
		MemberDTO memberDTO = (MemberDTO) session.getAttribute("member");
		
		// 중복 검사하기
		Long result = reviewService.verifyDuplicated(productDTO, memberDTO);
		
		if(result != null) { // 중복 있음
			mv.addObject("message", "이미 작성한 리뷰가 있습니다.");
			mv.addObject("path", referer);
			mv.setViewName("common/result");
			return mv;
		}
		
		// 리뷰를 작성하려는 상품정보 불러오기
		productDTO = reviewService.searchProduct(productDTO);
		
		// 상품이 판매중지되었는지 확인
		if(productDTO.getSale() == 0) {
			mv.addObject("message", "판매가 중지되었거나 수정된 상품입니다.");
			mv.addObject("path", referer);
			mv.setViewName("common/result");
			return mv;
		}
		
		mv.addObject("productDTO", productDTO);
		mv.setViewName("review/add");
		
		return mv;
	}
	
	@PostMapping("addResult")
	public ModelAndView addResult(ReviewDTO reviewDTO) throws Exception {
		ModelAndView mv = new ModelAndView();
		
		int result = reviewService.add(reviewDTO);
		
		String message = "리뷰 등록에 성공했습니다.";
		
		if(result < 1) {
			message = "리뷰 등록에 실패했습니다.";
		}
		
		mv.addObject("message", message);
		mv.addObject("path", "../payment/list");
		mv.setViewName("common/result");
		
		return mv;
	}
	
	@GetMapping("list")
	public void list(ReviewDTO reviewDTO, Model model, Pager pager) throws Exception {
		
		List<ReviewDTO> reviewDTOs = reviewService.list(reviewDTO, pager);
		
		model.addAttribute("pager", pager);
		model.addAttribute("reviewDTOs", reviewDTOs);
	}
	
	@PostMapping("delete")
	public ModelAndView delete(ReviewDTO reviewDTO) throws Exception {
		ModelAndView mv = new ModelAndView();
		
		int result = reviewService.delete(reviewDTO);
		
		mv.addObject("result", result);
		mv.setViewName("common/ajaxResult");
		
		return mv;
	}
	
	@PostMapping("update")
	public ModelAndView update(ReviewDTO reviewDTO) throws Exception {
		ModelAndView mv = new ModelAndView();
		
		int result = reviewService.update(reviewDTO);
		
		mv.addObject("result", result);
		mv.setViewName("common/ajaxResult");
		return mv;
	}
}

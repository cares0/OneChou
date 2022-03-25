package com.onechou.shop.product;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import com.onechou.shop.member.MemberDTO;
import com.onechou.shop.review.ReviewDTO;
import com.onechou.shop.roastery.RoasteryDTO;
import com.onechou.shop.util.Pager;

@Controller
@RequestMapping(value = "/product/**")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@RequestMapping(value = "add", method = RequestMethod.GET)
	public void add(HttpSession session, Model model) throws Exception {
		// 여기서 회원 ID를 통해 로스터리 번호, 로스터리이름을 조회해서 Attribute로 담아서 입력폼으로 넘겨줌
		MemberDTO memberDTO = (MemberDTO) session.getAttribute("member");
		
		RoasteryDTO roasteryDTO = productService.searchRoastery(memberDTO);
		
		model.addAttribute("roasteryDTO", roasteryDTO);
		
	}
	
	@RequestMapping(value = "add", method = RequestMethod.POST)
	public String add(ProductDTO productDTO, MultipartFile file, String[] optionNames, String[] addPrices, ProductFeatureDTO productFeatureDTO, String[] noteNames, Model model) throws Exception {
		// 입력폼에서 받은 로스터리 번호, 이름이 productDTO에 담기게 됨, 알아서 INSERT하면 됨
		
		// 받은 옵션내용 + 가격들 DTO에 넣고 List에 담기
		List<ProductOptionDTO> productOptionDTOs = new ArrayList<ProductOptionDTO>();
		for(int i=0;i<optionNames.length;i++) {
			// 사용자가 옵션추가버튼을 눌러놓고 값을 입력하지 않으면 발생하는 예외 처리
			if(!addPrices[i].equals("") && !optionNames[i].equals("")) {
				ProductOptionDTO productOptionDTO = new ProductOptionDTO();
				productOptionDTO.setOptionName(optionNames[i]);
				productOptionDTO.setAddPrice(Integer.parseInt(addPrices[i]));
				productOptionDTOs.add(productOptionDTO);
			}
		}
		
		// 받은 컵노트들 DTO에 넣고 List에 담기
		List<ProductCupnoteDTO> productCupnoteDTOs = new ArrayList<ProductCupnoteDTO>();
		for(int i=0;i<noteNames.length;i++) {
			ProductCupnoteDTO productCupnoteDTO = new ProductCupnoteDTO();
			productCupnoteDTO.setNoteName(noteNames[i]);
			productCupnoteDTOs.add(productCupnoteDTO);
		}
		
		// 최종적으로 모두 ProductDTO에 담아서 Service로 보내기
		productFeatureDTO.setProductCupnoteDTOs(productCupnoteDTOs);
		productDTO.setProductFeatureDTO(productFeatureDTO);
		productDTO.setProductOptionDTOs(productOptionDTOs); 
		
		boolean check = productService.add(productDTO, file);
		
		String message = "정상적으로 등록되었습니다.";
		String path = "../"; // 나중에 내 상품 리스트로 수정
		
		if (!check) {
			message = "등록에 실패했습니다.";
		}
		
		model.addAttribute("message", message);
		model.addAttribute("path", path);
		
		return "common/result";
	}
	
	@RequestMapping(value = "list", method = RequestMethod.GET)
	public void list(Model model, Pager pager) throws Exception {
		List<ProductDTO> productDTOs = productService.list(pager);
		model.addAttribute("productDTOs", productDTOs);
		model.addAttribute("pager", pager);
	}
	
	@RequestMapping(value = "detail", method = RequestMethod.GET)
	public void detail(ProductDTO productDTO, Model model) throws Exception {
		
		// 해당 상품의 기본 특징들 조회해오기 (상품정보, 특징, 이미지 등)
		productDTO = productService.detailBasic(productDTO);
		
		// 해당 상품의 옵션들 조회해오기
		productDTO.setProductOptionDTOs(productService.detailOption(productDTO));
		
		// 해당 상품의 리뷰들 조회해오기
		productDTO.setReviewDTOs(productService.detailReview(productDTO));
		
		// 리뷰 평균 DB에서 조회하기
		Double reviewAvg = productService.getReviewAvg(productDTO);
		
		// 해당 상품의 질문들 조회해오기
		productDTO.setQnaDTOs(productService.detailQna(productDTO));
		
		// 조회한 정보 Attribute에 담아서 보내기
		model.addAttribute("productDTO", productDTO);
		model.addAttribute("reviewAvg", reviewAvg);
	}
	
}
import Tnc from '../../../../public/tnc.png'
export default function PrinciplePage() {
  return (
    <div>
      <div className="p-6">
        <div className="flex justify-center"><img src={Tnc} alt="p" className='md:w-[250px]' /></div>
        <div className="font-bold text-[22px] text-center">Get the cheapest quote for home services and materials</div>

        {/* principle  */}
        <div className="mt-6">
          <div className="font-bold text-[20px]">How does Buildeo work?</div>
          <div className="text-justify text-[#455A64] font-medium">
            Upload your existing offer to a craft service, wait for the results and in the end benefit 
            from a cheaper, high-quality offer. We take over the stressful, cost-intensive search for offers 
            for you. Just upload, wait and you're done!
          </div>
        </div>
        <div className="mt-6">
          <div className="font-bold text-[20px]">How can you offer a cheaper deal?</div>
          <div className="text-justify text-[#455A64] font-medium">
            Thanks to our specially trained employees, partnerships in Hadnwerk, 
            and our intelligent system, we have the opportunity to undercut your offer. 
            Simply upload your previous offers and we will take care of the rest! We will then 
            send you a more favorable offer as soon as we have one. Just upload, wait and you're done!
          </div>
        </div>
        <div className="mt-6">
          <div className="font-bold text-[20px]">What if I like an offer?</div>
          <div className="text-justify text-[#455A64] font-medium">
            If you like our offer, simply let us know in writing.
             All further details can then be discussed with the company carrying out the work. 
             Payment and troubleshooting continues through us.
          </div>
        </div>
        <div className="mt-6">
          <div className="font-bold text-[20px]">How does payment processing work?</div>
          <div className="text-justify text-[#455A64] font-medium">
            Payment is made via BUILDEO. Pay securely via PayPal, Klarna, Payment in advance,
             credit card for your order. As part of these payment methods, you are then entitled to buyer protection. 
             You can report this directly to the payment service provider.
          </div>
        </div>
        <div className="mt-6">
          <div className="font-bold text-[20px]">What do I do if I don't like the result?</div>
          <div className="text-justify text-[#455A64] font-medium">
            If you don't like the result of your service, you should first discuss this with the company carrying out the work. 
            It should be considered whether an agreement between both parties is possible without BUILDEO or a payment service provider. 
            If this is not possible, BUILDEO can be switched on as a mediator.
          </div>
        </div>
        <div className="mt-6">
          <div className="font-bold text-[20px]">What costs will I incur?</div>
          <div className="text-justify text-[#455A64] font-medium">
            You negotiate a set price with your craftsman before placing the order. 
            If additional costs arise, for example due to different materials, unforeseeable additional work or similar,
             these will be charged immediately to be agreed with BUILDEO and with the customer from the executing company. 
             This way you can be sure that you don't have any unpleasant surprises at the end. You have full cost control - at any time!
          </div>
        </div>
        <div className="mt-6">
          <div className="font-bold text-[20px]">How are the partner companies selected?</div>
          <div className="text-justify text-[#455A64] font-medium">
            BUILDEO selects its partners based on a variety of factors. On the one hand, there are test criteria 
            that every company must pass in order to be considered for a partnership. Employees in partner management 
            contact the partners and evaluate the companies based on other characteristics in order to guarantee a minimum level for the customer.
          </div>
        </div>
        <div className="mt-6">
          <div className="font-bold text-[20px]">How does communication take place?</div>
          <div className="text-justify text-[#455A64] font-medium">
            All aspects regarding payment, contract conditions, problems or contract-relevant aspects must be clarified with BUILDEO.
             Further conditions, such as making an appointment, procedure or questions about the service, should be discussed directly 
             with the company carrying out the work.
          </div>
        </div>
      </div>
    </div>
  )
}

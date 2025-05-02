import { useSearchParams } from "next/navigation";
import { IoSend } from "react-icons/io5";

function SendLinkConfirmPage () {
  
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className="text-center border pc:w-[480px] w-[90%] pc:max-w-full max-w-[400px] mx-auto py-10 bg-gray-gray_lighter border-gray-gray rounded-[10px] inline-flex items-center flex-col">
      <h1 className="pc:text-h2 text-h3 text-gray-black">
        以下のアドレスに<br />
        メールを送信しました
      </h1>
      <div className="pc:mt-10 mt-7">
        <div className="pc:text-[80px] text-[60px] text-core-blue mx-auto inline-block">
          <IoSend />
        </div>
        <p className="pc:mt-10 mt-7 pc:text-h2 text-h3">
          {email || "example@mail.com"}
        </p>
      </div>
      <p className="pc:mt-10 mt-7 pc:text-body_pc text-timestamp text-gray-black">
        パスワード再設定のご案内をお送りいたしました<br />
        メールをご確認ください
      </p>
    </div>
  );
}

export default SendLinkConfirmPage;
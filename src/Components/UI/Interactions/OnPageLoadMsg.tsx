import React, { useState } from "react";

import styles from "./OnPageLoadMsg.module.css";
import ModalTemplate from "../PageElements/ModalTemplate";

const OnPageLoadMsg = () => {
  const agreedBefore = !!localStorage.getItem("agreed");
  const [agreed, setAgreed] = useState(agreedBefore);

  const agreeHandler = () => {
    setAgreed(true);
    localStorage.setItem("agreed", "1");
  };

  return (
    <React.Fragment>
      {!agreed && (
        <ModalTemplate>
          <div className={styles.modalDiv}>
            <h2 className={styles.title}>Disclaimer</h2>
            <p className={styles.disclaimer}>
              The financial information provided on this platform is for general
              informational purposes only and should <strong>not</strong> be
              considered as financial advice. The content is provided "as is"
              and without warranties of any kind, either expressed or implied.
              While we strive to provide accurate and up-to-date information, we
              make no representations or warranties of any kind, express or
              implied, about the completeness, accuracy, reliability,
              suitability, or availability with respect to the financial
              information contained herein. Any reliance you place on such
              information is strictly at your own risk. We strongly recommend
              consulting with a qualified financial advisor before making any
              financial decisions. The financial information provided here is
              not a substitute for professional advice and should not be relied
              upon for making financial decisions. We disclaim any liability for
              any loss or damage arising from reliance on the financial
              information provided on this platform. Any actions you take based
              on the financial information provided are solely at your own
              discretion. We do not endorse or recommend any specific financial
              products, services, or providers mentioned on this platform. Any
              mention of such products, services, or providers is for
              informational purposes only and should not be construed as an
              endorsement. Please seek professional advice from a qualified
              financial advisor before taking any financial actions based on the
              information provided on this platform. If you have specific
              questions regarding your financial situation, we encourage you to
              consult with a qualified professional.
            </p>
            <button className={styles.btn} onClick={agreeHandler}>
              I Understand & Agree
            </button>
            <a href={"https://www.google.com/"}>
              <button className={styles.btn}>Decline</button>
            </a>
          </div>
        </ModalTemplate>
      )}
    </React.Fragment>
  );
};

export default OnPageLoadMsg;

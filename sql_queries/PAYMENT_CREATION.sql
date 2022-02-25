CREATE TABLE PAYMENTS
(
    TRX_ID         VARCHAR(36) PRIMARY KEY,
    PAID_AMOUNT    INTEGER     NOT NULL,
    PAYMENT_MEDIUM VARCHAR(20) NOT NULL,
    PHONE_NUMBER   VARCHAR(30) NOT NULL,
		TIME_PAID      DATE DEFAULT SYSDATE NOT NULL,
    CHECK (PAID_AMOUNT >= 0)
);
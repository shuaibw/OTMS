async function confirmClick(sid, iid, subject, booking_type, status) {
    location.href = `/book/${sid}/${iid}/${subject}/${booking_type}/${status}`;
}

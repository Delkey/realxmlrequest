/**
 *
 * @param  {number} currentPage  현재 페이지 번호
 * @param  {number} totalRecord  총 레코드 수
 * @param  {number} pageSize     페이지 사이즈 (default: 10)
 * @param  {number} blockSize    블락 사이즈 (default: 10)
 * @return {object}
 */
const pagination = (currentPage, totalRecord, pageSize = 10, blockSize = 10) => {
  const totalPage = Math.ceil(totalRecord / pageSize);
  const blockStartPage = Math.floor(currentPage / blockSize) * blockSize + 1;
  const blockEndPage = Math.min(blockStartPage + blockSize - 1, totalPage);
  const pages = [];

  for (let p = blockStartPage; p <= blockEndPage; p++) {
    pages.push(p);
  }

  return { currentPage, totalPage, pages };
};

const test = () => {
  console.log("pagination start...");
  console.log(pagination(53, 584, 10, 15));
  console.log("pagination end...");
};

test();

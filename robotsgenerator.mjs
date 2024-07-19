import robotstxt from "generate-robotstxt";
import { createWriteStream } from 'fs';

robotstxt({
  policy: [
    {
      userAgent: "Googlebot",
      allow: ["/", "/view-all/freelancer", "/projects", "/why-alanced", "/enterprises", "/about-us", "/contact-us", "/safety-security", "/FAQ", "/terms", "/Privacy", "/cookies"],
      disallow: ["/hirer/profile", "/View-all/Job-post", "/View-all/proposals", "/View/proposal", "/View/Job-post", "/edit/Job-post", "/add/Job-post", "/hirer/profile-edit", "/notifications", "/freelancer/my-reports", "/view-all/invited-freelancers", "/view/invitation-Detail", "/view-all/hirer-contracts", "/freelancer/edit-profile", "/freelancer/profile", "/freelancer/view-project/detail", "/freelancer/view-referals", "/saved-jobs", "/my-proposals", "/my-jobs", "/messages", "/freelancer/all-contracts", "/freelancer/my-reports", "/freelancer/add/portfolio", "/freelancer/add-bid", "/freelancer/send-proposal", "/View/freelancer/proposal", "/View/bid-details", "/view-project/full-detail", "/send-proposal/detail", "/view/SelfBidProject", "/notifications", "/freelancer/add-portfolio", "/view/hiring-detail", "/all-invitations"],
      crawlDelay: 2
    },
    {
      userAgent: "*",
      allow: ["/", "/view-all/freelancer", "/projects", "/why-alanced", "/enterprises", "/about-us", "/contact-us", "/safety-security", "/FAQ", "/terms", "/Privacy", "/cookies"],
      disallow: ["/hirer/profile", "/View-all/Job-post", "/View-all/proposals", "/View/proposal", "/View/Job-post", "/edit/Job-post", "/add/Job-post", "/hirer/profile-edit", "/notifications", "/freelancer/my-reports", "/view-all/invited-freelancers", "/view/invitation-Detail", "/view-all/hirer-contracts", "/freelancer/edit-profile", "/freelancer/profile", "/freelancer/view-project/detail", "/freelancer/view-referals", "/saved-jobs", "/my-proposals", "/my-jobs", "/messages", "/freelancer/all-contracts", "/freelancer/my-reports", "/freelancer/add/portfolio", "/freelancer/add-bid", "/freelancer/send-proposal", "/View/freelancer/proposal", "/View/bid-details", "/view-project/full-detail", "/send-proposal/detail", "/view/SelfBidProject", "/notifications", "/freelancer/add-portfolio", "/view/hiring-detail", "/all-invitations"],
      crawlDelay: 10,
      sitemap: "http://www.alanced.com/sitemap.xml",
      host: "http://www.alanced.com"
    }
  ]
})
.then((content) => {
  console.log(content);
  const writeStream = createWriteStream('./public/robots.txt');
      
  // Write the sitemap content to the file stream
  writeStream.write(content);
      
  // Close the write stream
  writeStream.end();
  return content;
})
.catch((error) => {
  throw error;
});

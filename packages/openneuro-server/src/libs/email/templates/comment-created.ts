export const commentCreated = ({
  siteUrl,
  name,
  commentStatus,
  commentId,
  commentUserId,
  commentContent,
  datasetName,
  datasetLabel,
  dateCreated,
}: {
  siteUrl: string
  name: string
  commentStatus: string
  commentId: string
  commentUserId: string
  commentContent: string
  datasetName: string
  datasetLabel: string
  dateCreated: string
}): string => `<html>
<head>
<style>
	body {
		font-family: 'Open Sans', sans-serif;
		font-weight: lighter;
		background: #F5F5F5;
	}
	footer {
		border-top: 1px solid #333;
		padding-top: 15px;
		background: #F5F5F5;
	}
	.link {
		color: #00505c
	}
	.link:hover {
		color: #0093a9
	}
	.top-bar {
		width: 100%;
		background: #333;
		padding: 8px 0px 8px 15px;
	}
	.content {
		padding: 15px;
	}
	p {
		font-size: 16px;
		font-weight: lighter;
	}
	b {
		font-weight: bold;
	}
	.dataset-link {
		display: inline-block;
		background: #008599;
		color: #FFF;
		font-size: 20px;
		padding: 8px 15px;
		text-decoration: none;
		cursor: pointer;
	}
	.link-div {
		padding-top: 20px;
	}
	.comment {
		border: 1px solid #ccc;
		padding: 15px;
	}
	.FAILED {color: #d9534f;}
	.FINISHED {color: #5cb85c;}
</style>
</head>
<body>
	<div class="top-bar">
		<img src="${siteUrl}/assets/email-header.1cb8bf76.png" />
	</div>
	<div class="content">
		<h2>Hi, ${name}</h2>

		<p>
			A new ${commentStatus} has been posted on a dataset you follow, <b>${datasetLabel}</b>. 
		</p>
		<div class="comment">
			<p>By: <b>${commentUserId}</b> on ${dateCreated}</p>
			
			${commentContent}		
		</div>
		<div class="link-div">
			<a class="dataset-link" href="${siteUrl}/datasets/${datasetName}#comment-${commentId}">Click here to view this comment on OpenNeuro &raquo;</a>
		</div>

		<p>
			Sincerely,
			The CRN Team
		</p>

	</div>
</body>
<footer>
	If you would like to stop receiving notifications about this dataset, please <a class='link' href="${siteUrl}/datasets/${datasetName}">visit the dataset page</a> and click the 'unfollow' icon.
</footer>
<html>`

# Valentine's Day Web Experience - AWS Deployment Guide

## Prerequisites
- AWS CLI configured
- Domain name (optional)
- Audio file named `ambient.mp3` (place in project root)

## Step 1: Create S3 Bucket

```bash
# Create bucket (replace with unique name)
aws s3 mb s3://valentine-experience-2024

# Enable static website hosting
aws s3 website s3://valentine-experience-2024 --index-document index.html
```

## Step 2: Upload Files

```bash
# Upload all files
aws s3 sync . s3://valentine-experience-2024 --exclude "*.md" --exclude ".git/*"

# Set public read permissions
aws s3api put-bucket-policy --bucket valentine-experience-2024 --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::valentine-experience-2024/*"
    }
  ]
}'
```

## Step 3: Create CloudFront Distribution

```bash
# Create distribution configuration
cat > cloudfront-config.json << EOF
{
  "CallerReference": "valentine-$(date +%s)",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-valentine-experience-2024",
        "DomainName": "valentine-experience-2024.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-valentine-experience-2024",
    "ViewerProtocolPolicy": "redirect-to-https",
    "MinTTL": 0,
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    }
  },
  "Comment": "Valentine Experience Distribution",
  "Enabled": true
}
EOF

# Create distribution
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

## Step 4: Optional Password Protection (Lambda@Edge)

Create Lambda function for basic auth:

```javascript
// lambda-auth.js
exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    
    const authString = 'Basic ' + Buffer.from('valentine:love2024').toString('base64');
    
    if (typeof headers.authorization == 'undefined' || headers.authorization[0].value != authString) {
        const response = {
            status: '401',
            statusDescription: 'Unauthorized',
            body: 'Unauthorized',
            headers: {
                'www-authenticate': [{key: 'WWW-Authenticate', value:'Basic'}]
            },
        };
        callback(null, response);
    }
    
    callback(null, request);
};
```

Deploy Lambda@Edge:
```bash
# Package function
zip lambda-auth.zip lambda-auth.js

# Create function
aws lambda create-function \
  --function-name valentine-auth \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR-ACCOUNT:role/lambda-edge-role \
  --handler lambda-auth.handler \
  --zip-file fileb://lambda-auth.zip \
  --region us-east-1

# Publish version
aws lambda publish-version --function-name valentine-auth --region us-east-1
```

## Step 5: Custom Domain (Optional)

```bash
# Request SSL certificate
aws acm request-certificate \
  --domain-name yourdomain.com \
  --validation-method DNS \
  --region us-east-1

# Update CloudFront distribution with custom domain and certificate
# (Use AWS Console for easier configuration)
```

## Audio File Setup

Add a romantic music file as `romantic-music.mp3`. Recommended lively romantic tracks:
- "La Vie En Rose" (instrumental)
- "Moon River" (jazz version)
- "The Way You Look Tonight" (instrumental)
- Any upbeat romantic jazz or classical piece

Sources:
- Freesound.org
- YouTube Audio Library
- Pixabay Music

## Final Steps

1. Wait for CloudFront deployment (15-20 minutes)
2. Test the experience at your CloudFront domain
3. Share the private URL with your Valentine

## Cost Estimate
- S3: ~$0.50/month for storage and requests
- CloudFront: ~$1-5/month depending on traffic
- Lambda@Edge: ~$0.20 per million requests

Total monthly cost: Under $10 for typical usage.
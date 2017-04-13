<?xml version='1.0' encoding='iso-8859-1'?>

<!-- Description: HTML rendition for standalone browser display, Version June 8th, 2016 - Credits: S. Worseck, G. Schifferdecker -->
<!-- Filename: ghsts.html -->

<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:ghsts="http://www.oecd.org/GHSTS">

<xsl:template match="/ghsts:GHSTS">
<html>
<head>
<style type='text/css'>table {background-color: #ffffcc}</style>
<style type='text/css'>td {text-align: left;vertical-align: top}</style>
<style type='text/css'>th {font-weight:normal; text-align: left}</style>
<style type='text/css'>filename {font-weight:bold; color:blue}</style>
<style type='text/css'>value {font-weight:bold;}</style>
<style type='text/css'>Anchor {font-weight:bold; color:green}</style>
<style type='text/css'>externalAnchor{font-weight:bold; color:aqua}</style>
</head>
	
	<body>
		<h1>GHSTS submission content view &#160;  &#160;  &#160;  &#160;  &#160;  &#160;  &#160;  <img align="middle" id="logoOecd" src="utils\viewer\img\GHSTS_logo.png"  /></h1>
		<h2>Legal Entities</h2>
		<table  width="1000px" border ='1' >
				<tr style="background-color:#efefef;">	
					<th>Id</th>
					<th>Name</th>
					<th>Identifier</th>
					<th>Contact</th>
					<th>Contact Person</th>
				</tr>
				<xsl:for-each select="ghsts:LEGAL_ENTITIES/ghsts:LEGAL_ENTITY">
					<tr>	
						<td><xsl:value-of select='@Id'/>&#160; </td>
						<td><xsl:value-of select='ghsts:LEGALENTITY_NAME' />&#160;  </td>
						<td><xsl:value-of select='ghsts:LEGALENTITY_IDENTIFIER/ghsts:LEGALENTITY_IDENTIFIER_TYPE/ghsts:VALUE_DECODE'/>&#160; </td>
						<td><xsl:value-of select='ghsts:CONTACT_ADDRESS'/>&#160; </td>
						<td><xsl:value-of select='ghsts:CONTACT_PERSON'/>&#160;	</td>
						</tr>
					</xsl:for-each>
		 </table>	

      <!-- ......................................................................................................................................... -->

		<h2>Receivers and Sender</h2>
		<table  width="1000px" border ='1' >
			<xsl:for-each select="ghsts:RECEIVERS/ghsts:RECEIVER">
				<tr>	
					<td width="25%" style="background-color:#efefef;">Receiver</td>
					<td>
						<xsl:call-template name = "Decode_Legal_Entity">
							<xsl:with-param name="MY_LE_ID" select="@To_Legal_Entity_Id" />
						</xsl:call-template>
						<table >
								<tr style="background-color:#efefef;">
									<th>Sender</th>
								</tr>
										<xsl:for-each select="ghsts:SENDER">
										<tr>
											<td>
											<xsl:call-template name = "Decode_Legal_Entity">
												<xsl:with-param name="MY_LE_ID" select="@To_Legal_Entity_Id" />
											</xsl:call-template>
											</td>
										</tr>
										</xsl:for-each>
						 </table>	
					</td>

				</tr>	
			</xsl:for-each>
		 </table>	

      <!-- ......................................................................................................................................... -->

		<h2>Product</h2>
		<table  width="1000px" border ='1' >
			<tr>	<td width="25%" style="background-color:#efefef;">Generic product name</td>
					<td><xsl:value-of select='ghsts:PRODUCT/ghsts:GENERIC_PRODUCT_NAME'/></td></tr>
			<tr><td style="background-color:#efefef;">Formulation type</td><td><xsl:value-of select="ghsts:PRODUCT/ghsts:FORMULATION_TYPE/ghsts:VALUE_DECODE"/></td></tr>
			<tr>	<td style="background-color:#efefef;">RA specific</td>
				<td>
					<table width ="100%" border ='0' >
						<tr style="background-color:#efefef;">
							<th>Authority</th>
							<th>Product name</th>
							<th>Admin number</th>
						</tr>
						<xsl:for-each select="ghsts:PRODUCT/ghsts:PRODUCT_RA">
							<tr>
								<td>										
									<xsl:call-template name = "Decode_RA">
									<xsl:with-param name="MY_RA_ID" select="@To_Specific_for_RA_Id" />
									</xsl:call-template>
								</td>
								<td><xsl:value-of select='ghsts:PRODUCT_NAME'/>&#160; </td>
								<td>
								<xsl:for-each select="ghsts:ADMIN_NUMBER">
									<xsl:value-of select="current()"/>&#160; 
									</xsl:for-each>
								</td>
							</tr>
						</xsl:for-each>
					</table>
				</td>
			</tr>
			<tr>
				<td style="background-color:#efefef;">Ingredients</td>
				<td>
					<table width ="100%" border ='0' >
						<tr>
							<th>Ingredients</th>
							<th>Quantity</th>
							<th>CAS</th>
						</tr>
						<xsl:for-each select="ghsts:PRODUCT/ghsts:INGREDIENTS/ghsts:INGREDIENT">
							<tr>
								<td  ><xsl:value-of select='@To_Substance_Id'/></td>
								<td  ><xsl:value-of select='ghsts:QUANTITY'/> <xsl:value-of select='ghsts:UNIT'/></td>
								<td  ><xsl:value-of select='ghsts:CAS'/></td>
							</tr>
						</xsl:for-each>
					</table>	
				</td>
			</tr>

		 </table>	

      <!-- ......................................................................................................................................... -->
		<h2>Dossier  and Submission(s)</h2>
		<table  width="1000px" border ='1' >
			<tr>
					<td width="25%" style="background-color:#efefef;">Dossier title</td>
					<td><xsl:value-of select='ghsts:PRODUCT/ghsts:DOSSIER/ghsts:DOSSIER_DESCRIPTION_TITLE'/></td>
			</tr>			
			
			<tr>
				<td style="background-color:#efefef;">Referenced dossiers</td>
				<td>
					<table width ="100%" border ='0' >
					<xsl:for-each select='ghsts:PRODUCT/ghsts:DOSSIER/ghsts:REFERENCED_DOSSIER'>
						<tr>
						<td><xsl:value-of select='ghsts:REFERENCED_DOSSIER_NUMBER'/></td>
						<td><xsl:value-of select='ghsts:REFERENCED_DOSSIER_REASON'/></td>
						</tr>
						</xsl:for-each>
					</table>	
				</td>
			</tr>		
			
			<tr>
					<td style="background-color:#efefef;">RA specific</td>
					<td>
						<table width ="100%" border ='0'>
							<tr style="background-color:#efefef;">
								<th>Authority</th>
								<th>Regulatory Type</th>
								<th>Applikatiion Type</th>
								<th>Project ID Number</th>
								</tr>
						<xsl:for-each select="ghsts:PRODUCT/ghsts:DOSSIER/ghsts:DOSSIER_RA">
								<tr>
								<td>
									<xsl:call-template name = "Decode_RA">
									<xsl:with-param name="MY_RA_ID" select="@To_Specific_for_RA_Id" />
									</xsl:call-template>
								</td>
								<td><xsl:value-of select='ghsts:REGULATORY_TYPE/ghsts:VALUE_DECODE'/>&#160;</td>
								<td><xsl:value-of select='ghsts:APPLICATION_TYPE/ghsts:VALUE_DECODE'/>&#160; </td>
								<td>
								<xsl:for-each select="ghsts:PROJECT_ID_NUMBER">
									<xsl:value-of select="current()"/>&#160; 
									</xsl:for-each>
								</td>
								</tr>
							</xsl:for-each>
						</table>
				</td>
			</tr>

			<tr>
					<td style="background-color:#efefef;">Submission history</td>
					<td>
						<table width ="100%" border ='0'>
							<tr  style="background-color:#efefef;">
								<th>Submission Title</th>
								<th>Version</th>
								<th>Date</th>
								<th>Incremental</th>
							</tr>
						<xsl:for-each select="ghsts:PRODUCT/ghsts:DOSSIER/ghsts:SUBMISSION">
							<tr>
								<td ><xsl:value-of select='ghsts:SUBMISSION_TITLE'/></td>
								<td><xsl:value-of select='ghsts:SUBMISSION_NUMBER'/></td>
								<td ><xsl:value-of select='ghsts:SUBMISSION_VERSION_DATE'/></td>
								<td><xsl:value-of select='ghsts:INCREMENTAL'/></td>
								</tr>
							</xsl:for-each>
							</table>
						</td>
			</tr>


		 </table>
		
	
      <!-- ......................................................................................................................................... -->
		
		<h2>List of submitted Documents by Authors</h2>
		<table width="1000px" border ="1">
		
				<tr  style="background-color:#efefef;">
				<th>Author(s)</th>
				<th>Title</th>
				<th>Document Company Number(s)</th>
				<th>Document Family</th>
				<th>Document Date</th>
				<th>Complete Source</th>
				<th>Hyperlink to File(s)</th>
				
				</tr>
		<xsl:for-each select='ghsts:DOCUMENTS/ghsts:DOCUMENT/ghsts:DOCUMENT_GENERIC'>
				<xsl:sort select="concat(ghsts:DOCUMENT_AUTHOR, ghsts:DOCUMENT_ISSUE_DATE)"/> 
					  <tr>
						<xsl:call-template name = "Document_row">
							<xsl:with-param name="MY_DO_ID" select="../@Id" />
						</xsl:call-template>
						</tr>
			</xsl:for-each>
			
		</table>


    <!-- ......................................................................................................................................... -->

		<h2>List of submitted Documents by Table of Content (ToC)</h2>
		<h3>Used ToC</h3>
		<table  width="1000px" border ='1' >
			<xsl:for-each select="ghsts:TOC">
				<tr>	
					<td width="25%" style="background-color:#efefef;">Table of Content (short name)</td>
					<td><xsl:value-of select='ghsts:TOC_SHORT_NAME'/></td>
				</tr>	
				<tr>	
					<td width="25%" style="background-color:#efefef;">Table of Content (full name)</td>
					<td><xsl:value-of select='ghsts:TOC_FULL_NAME'/></td>
				</tr>	
				<tr>	
					<td width="25%" style="background-color:#efefef;">Version</td>
					<td><xsl:value-of select='ghsts:TOC_VERSION'/></td>
				</tr>	
			</xsl:for-each>
		 </table>	
		 
		<h3>Sorted by Annex Points</h3>
		<table  width="1000px" border ='1' >
		
			<tr  style="background-color:#efefef;">
				<th>Annex Point</th>
				<th>Author(s)</th>
				<th>Title</th>
				<th>Document Company Number(s)</th>
				<th>Document Family</th>
				<th>Document Date</th>
				<th>Complete Source</th>
				<th>Hyperlink to File(s)</th>
				</tr>
		
		
			<xsl:for-each select=".//ghsts:TOC_NODE">   
			<xsl:sort select="ghsts:NODE_NAME"/> 
				<tr>	
					<xsl:variable name="toDoc"  
							select="count(./ghsts:TOC2DOC)"/>
					
					  <xsl:choose>
						  <xsl:when test ="$toDoc&gt;0" >
								<td width="15%">
										<xsl:attribute name='rowspan'><xsl:value-of select='1 + $toDoc'/></xsl:attribute>
										<b><xsl:value-of select='ghsts:NODE_NAME'/></b></td>
								 <td colspan="7"><b><xsl:value-of select='ghsts:NODE_HEADING'/></b></td>
						 </xsl:when>
						 <xsl:otherwise>
								<td width="15%">	<xsl:value-of select='ghsts:NODE_NAME'/></td>
								<td colspan="7"><xsl:value-of select='ghsts:NODE_HEADING'/></td>
						 </xsl:otherwise>
					   </xsl:choose>
				</tr>	
						<xsl:for-each select="./ghsts:TOC2DOC">   
							<tr>	
								<xsl:call-template name = "Document_row">
								<xsl:with-param name="MY_DO_ID" select="@To_Document_Id" />
								</xsl:call-template>
							</tr>	
						</xsl:for-each>
			</xsl:for-each>
		 </table>	

			 
</body>
</html>

</xsl:template>

<!-- Fielname by Id            ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    -->
		<xsl:template name="Filename">
		 <xsl:param name="MY_FI_ID"/>
		 <table>
			<xsl:for-each select='/ghsts:GHSTS/ghsts:FILES/ghsts:FILE[@Id=$MY_FI_ID]'>
				<tr>
					<td>
					<a target="_blank"><xsl:attribute name='href'><xsl:value-of select='ghsts:FILE_GENERIC/ghsts:FILENAME'/></xsl:attribute>
					<xsl:value-of select='$MY_FI_ID'/></a>	
					</td>	
				</tr>
				</xsl:for-each>
		</table>
	 </xsl:template>

<!-- Decode LEGAL_ENTITY by Id            ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    -->
		<xsl:template name="Decode_Legal_Entity">
		 <xsl:param name="MY_LE_ID"/>
		<xsl:for-each select='/ghsts:GHSTS/ghsts:LEGAL_ENTITIES/ghsts:LEGAL_ENTITY[@Id=$MY_LE_ID]'>
				<xsl:value-of select='ghsts:LEGALENTITY_NAME'/>
				</xsl:for-each>
	 </xsl:template>

<!-- Decode RECEIVER by Id           ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    -->
		<xsl:template name="Decode_RA">
		 <xsl:param name="MY_RA_ID"/>
		<xsl:for-each select='/ghsts:GHSTS/ghsts:RECEIVERS/ghsts:RECEIVER[@Id=$MY_RA_ID]'>
					<xsl:call-template name = "Decode_Legal_Entity">
					<xsl:with-param name="MY_LE_ID" select="@To_Legal_Entity_Id" />
					</xsl:call-template>
				</xsl:for-each>
	 </xsl:template>
	 
	 
<!-- Document row by Id     (7 x columns)    +++++++++++++++++++++++++++++++++++++++++++++++++++++    -->
		<xsl:template name="Document_row">
		 <xsl:param name="MY_DO_ID"/>
		<xsl:for-each select='/ghsts:GHSTS/ghsts:DOCUMENTS/ghsts:DOCUMENT[@Id=$MY_DO_ID]/ghsts:DOCUMENT_GENERIC'>
						<td valign="top"><xsl:value-of select='ghsts:DOCUMENT_AUTHOR'/></td>
						<td valign="top"><xsl:value-of select='ghsts:DOCUMENT_TITLE'/></td>
						<td valign="top">
							<xsl:value-of select='ghsts:DOCUMENT_COMPANY_ID'/> &#160; 
								<table>
									 <xsl:for-each select='ghsts:DOCUMENT_NUMBER'>
											<tr><xsl:value-of select='ghsts:IDENTIFIER'/></tr>
									</xsl:for-each>
								</table>
							</td>
						<td valign="top"><xsl:value-of select='ghsts:DOCUMENT_FAMILY'/> &#160; </td>
						<td valign="top"><xsl:value-of select='ghsts:DOCUMENT_ISSUE_DATE'/></td>
						<td valign="top"><xsl:value-of select='ghsts:COMPLETE_DOCUMENT_SOURCE'/>&#160;</td>
						<td valign="top" align='center'>
								
								<xsl:for-each select='ghsts:REFERENCED_TO_FILE'>
									<xsl:call-template name = "Filename">
									<xsl:with-param name="MY_FI_ID" select="@To_File_Id" />
									</xsl:call-template>
								</xsl:for-each>
									
						</td>
				</xsl:for-each>
	 </xsl:template>
				




</xsl:stylesheet>


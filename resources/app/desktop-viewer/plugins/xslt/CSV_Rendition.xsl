<?xml version="1.0"?>

<!-- Description: Sample transformation from GHSTS to CSV - Credits: S. Worseck, G. Schifferdecker -->
<!-- Filename: ghsts.csv -->

<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:ghsts="http://www.oecd.org/GHSTS">

<!-- <xsl:output method="text" encoding="utf-8"/> -->
<xsl:output method="text" encoding="Windows-1252"/>

<xsl:strip-space elements="*" />

<!-- TAB between columns    -->
<xsl:variable name="delimiter" select="'&#x09;'"/>

<!-- # between multiple values in one column   -->
<xsl:variable name="delimiter_intern" select="'#'"/>

<!-- Next Record   -->
<xsl:variable name="CRLF" select="'&#x0D;&#x0A;'"/>
<xsl:variable name="CR" select="'&#x0D;'"/>
<xsl:variable name="LF" select="'&#x0A;'"/>

<xsl:template match="/ghsts:GHSTS">
<xsl:text>sep=</xsl:text><xsl:value-of select="$delimiter"/>
<xsl:value-of select="$LF"/>
<xsl:text>NODE_NAME(s)</xsl:text><xsl:value-of select="$delimiter"/>
<xsl:text>DOCUMENT_AUTHOR</xsl:text><xsl:value-of select="$delimiter"/>
<xsl:text>DOCUMENT_TITLE</xsl:text><xsl:value-of select="$delimiter"/>
<xsl:text>DOCUMENT_COMPANY_ID</xsl:text><xsl:value-of select="$delimiter"/>
<xsl:text>DOCUMENT_NUMBER(s)</xsl:text><xsl:value-of select="$delimiter"/>
<xsl:text>DOCUMENT_FAMILY</xsl:text><xsl:value-of select="$delimiter"/>
<xsl:text>DOCUMENT_ISSUE_DATE</xsl:text><xsl:value-of select="$delimiter"/>
<xsl:text>COMPLETE_DOCUMENT_SOURCE</xsl:text><xsl:value-of select="$delimiter"/>
<xsl:text>FILENAME(s)</xsl:text><xsl:value-of select="$delimiter"/>


<xsl:for-each select='ghsts:DOCUMENTS/ghsts:DOCUMENT/ghsts:DOCUMENT_GENERIC'>	
<xsl:value-of select="$LF"/>

	<xsl:call-template name = "AnnexPoints">
		<xsl:with-param name="MY_DO_ID" select="../@Id" />
	</xsl:call-template>
	<xsl:value-of select="$delimiter"/>
	
	<xsl:value-of select='ghsts:DOCUMENT_AUTHOR'/><xsl:value-of select="$delimiter"/>
	<xsl:value-of select='ghsts:DOCUMENT_TITLE'/><xsl:value-of select="$delimiter"/>
	<xsl:value-of select='ghsts:DOCUMENT_COMPANY_ID'/> <xsl:value-of select="$delimiter"/>
    <xsl:for-each select='ghsts:DOCUMENT_NUMBER'>
			<xsl:choose>
				<xsl:when test ="position()!=last()" >
					<xsl:value-of select='ghsts:IDENTIFIER'/><xsl:value-of select="$delimiter_intern"/>
					</xsl:when>
					<xsl:otherwise>
				<xsl:value-of select='ghsts:IDENTIFIER'/>
				</xsl:otherwise>
				</xsl:choose>
	  </xsl:for-each>
   <xsl:value-of select="$delimiter"/>
	<xsl:value-of select='ghsts:DOCUMENT_FAMILY'/> <xsl:value-of select="$delimiter"/>
	<xsl:value-of select='ghsts:DOCUMENT_ISSUE_DATE'/><xsl:value-of select="$delimiter"/>
	<xsl:value-of select='ghsts:COMPLETE_DOCUMENT_SOURCE'/><xsl:value-of select="$delimiter"/>

	<xsl:for-each select='ghsts:REFERENCED_TO_FILE'>
			<xsl:call-template name = "Filename">
			<xsl:with-param name="MY_FI_ID" select="@To_File_Id" />
			</xsl:call-template>
					<xsl:choose>
					<xsl:when test ="position()!=last()" >
						<xsl:value-of select="$delimiter_intern"/>
					</xsl:when>
					</xsl:choose>
		</xsl:for-each>
	<xsl:value-of select="$delimiter"/>	

</xsl:for-each>
</xsl:template>

<!-- Filename by Id            ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    -->
		<xsl:template name="Filename">
		 <xsl:param name="MY_FI_ID"/>
				<xsl:for-each select='/ghsts:GHSTS/ghsts:FILES/ghsts:FILE[@Id=$MY_FI_ID]'>
						<xsl:value-of select='ghsts:FILE_GENERIC/ghsts:FILENAME'/>
				</xsl:for-each>
	 </xsl:template>

<!-- Filename by Id            ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    -->
		<xsl:template name="AnnexPoints">
		 <xsl:param name="MY_DO_ID"/>
		 
 		<xsl:for-each select='/ghsts:GHSTS/ghsts:TOC/ghsts:STRUCTURE//ghsts:TOC_NODE/ghsts:TOC2DOC[@To_Document_Id=$MY_DO_ID]'>   
				<xsl:value-of select='../ghsts:NODE_NAME'/>
				<xsl:choose>
					<xsl:when test ="position()!=last()" >
						<xsl:value-of select="$delimiter_intern"/>
					</xsl:when>
					</xsl:choose>

			</xsl:for-each>
	 </xsl:template>


</xsl:stylesheet>